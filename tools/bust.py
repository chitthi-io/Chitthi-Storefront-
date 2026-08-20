#!/usr/bin/env python3
"""
Cache-busting for the chitthi.io storefront.

No bundler here, so asset URLs are versioned by hand: this stamps every
CSS/JS reference in the HTML with ?v=<content-hash>. When a file changes its
hash changes, the URL changes, and the browser is forced to refetch it.
Unchanged files keep their hash and stay cached.

Run before every commit:   python3 tools/bust.py
"""
import hashlib, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = ["index.html", "404.html"]
PATTERN = re.compile(r'((?:href|src)=")(assets/(?:css|js)/[A-Za-z0-9_.\-]+)(?:\?v=[0-9a-f]+)?(")')

def digest(rel: str) -> str | None:
    f = ROOT / rel
    if not f.exists():
        return None
    return hashlib.md5(f.read_bytes()).hexdigest()[:8]

def main() -> int:
    changed = []
    for name in HTML:
        p = ROOT / name
        if not p.exists():
            continue
        src = p.read_text(encoding="utf-8")

        def sub(m):
            pre, path, post = m.group(1), m.group(2), m.group(3)
            h = digest(path)
            return f"{pre}{path}{post}" if h is None else f"{pre}{path}?v={h}{post}"

        out = PATTERN.sub(sub, src)
        if out != src:
            p.write_text(out, encoding="utf-8")
            changed.append(name)

    for name in HTML:
        p = ROOT / name
        if not p.exists():
            continue
        for m in PATTERN.finditer(p.read_text(encoding="utf-8")):
            print(f"  {name}: {m.group(2)}?v={digest(m.group(2))}")

    print(f"\n  stamped: {', '.join(changed) if changed else 'no change needed'}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
