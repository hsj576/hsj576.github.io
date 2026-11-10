from pathlib import Path
import argparse
import base64
import json
import re
import mimetypes
import zipfile

ROOT = Path(__file__).resolve().parent
parser = argparse.ArgumentParser(description="Build a self-contained preview, including local images and talk PDFs.")
parser.add_argument("--output-dir", type=Path, default=ROOT.parent / "outputs")
parser.add_argument("--name", default="胡时京-个人主页-v7")
parser.add_argument("--zip", action="store_true", help="Also export source files; not needed for normal Git updates.")
args = parser.parse_args()
if Path(args.name).name != args.name or args.name in ("", ".", ".."):
    parser.error("--name must be a file stem, not a path")
OUT = args.output_dir.resolve()
OUT.mkdir(parents=True, exist_ok=True)

html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "styles.css").read_text(encoding="utf-8")
content = (ROOT / "content.js").read_text(encoding="utf-8")
app = (ROOT / "app.js").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="styles.css">', "<style>\n" + css + "\n</style>")
html = html.replace('<script src="content.js" defer></script>', "")
html = html.replace('<script src="app.js" defer></script>', "")
html = html.replace("</body>", "<script>\n" + content.replace("</script", "<\\/script") + "\n</script>\n<script>\n" + app.replace("</script", "<\\/script") + "\n</script>\n</body>")
resource_pattern = re.compile(r"(?:assets|files)/[A-Za-z0-9_./-]+\.(?:webp|svg|png|jpg|jpeg|pdf)")
resource_paths = sorted(set(resource_pattern.findall(html)))
embedded = {}
for relative in resource_paths:
    local = (ROOT / relative).resolve()
    if not local.is_relative_to(ROOT) or not local.is_file():
        raise ValueError("Missing or unsafe local resource: " + relative)
    mime = mimetypes.guess_type(relative)[0]
    if not mime or not (mime.startswith("image/") or mime == "application/pdf"):
        raise ValueError("Unsupported resource type: " + relative)
    encoded = base64.b64encode(local.read_bytes()).decode("ascii")
    embedded[relative] = "data:" + mime + ";base64," + encoded
html = resource_pattern.sub(lambda match: embedded[match.group(0)], html)
preview = OUT / (args.name + ".html")
preview.write_text(html, encoding="utf-8")
result = {"source_directory":str(ROOT), "preview":str(preview), "preview_bytes":preview.stat().st_size, "embedded_resources":len(resource_paths)}

if args.zip:
    source_files = ["index.html", "styles.css", "content.js", "app.js", "build_preview.py", ".nojekyll", "assets/image-sources.json", "assets/talks/sources.json"] + resource_paths
    package = OUT / (args.name + "-源码.zip")
    with zipfile.ZipFile(package, "w", compression=zipfile.ZIP_DEFLATED) as z:
        for file in dict.fromkeys(source_files):
            z.write(ROOT / file, ROOT.name + "/" + file)
    result.update(source_zip=str(package), zip_bytes=package.stat().st_size, files=len(source_files))
print(json.dumps(result, ensure_ascii=False, indent=2))
