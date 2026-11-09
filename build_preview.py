from pathlib import Path
import base64
import json
import re
import mimetypes
import zipfile

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "styles.css").read_text(encoding="utf-8")
content = (ROOT / "content.js").read_text(encoding="utf-8")
app = (ROOT / "app.js").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="styles.css">', "<style>\n" + css + "\n</style>")
html = html.replace('<script src="content.js" defer></script>', "")
html = html.replace('<script src="app.js" defer></script>', "")
html = html.replace("</body>", "<script>\n" + content.replace("</script", "<\\/script") + "\n</script>\n<script>\n" + app.replace("</script", "<\\/script") + "\n</script>\n</body>")
asset_names = sorted(set(re.findall(r"assets/([A-Za-z0-9_.-]+\.(?:webp|svg|png|jpg|jpeg))", html)))
assert "portrait.webp" in asset_names and "fudan-football.webp" in asset_names
for name in asset_names:
    mime = mimetypes.guess_type(name)[0]
    assert mime and mime.startswith("image/"), name
    data = base64.b64encode((ROOT / "assets" / name).read_bytes()).decode("ascii")
    html = html.replace("assets/" + name, "data:" + mime + ";base64," + data)
assert not re.search(r"assets/[A-Za-z0-9_.-]+\.(?:webp|svg|png|jpg|jpeg)", html)
preview = OUT / "胡时京-个人主页-v2.html"
preview.write_text(html, encoding="utf-8")
source_files = ["index.html", "styles.css", "content.js", "app.js", "build_preview.py", ".nojekyll", "assets/image-sources.json"] + ["assets/" + name for name in asset_names]
package = OUT / "胡时京-个人主页-v2-源码.zip"
with zipfile.ZipFile(package, "w", compression=zipfile.ZIP_DEFLATED) as z:
    for file in source_files:
        z.write(ROOT / file, "homepage-prototype/" + file)
print(json.dumps({"preview":str(preview), "preview_bytes":preview.stat().st_size,"source_zip":str(package),"zip_bytes":package.stat().st_size,"files":len(source_files)},ensure_ascii=False,indent=2))
