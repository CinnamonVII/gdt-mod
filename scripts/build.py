#!/usr/bin/env python3
import os

src_dir = os.path.join(os.path.dirname(__file__), '..', 'src')
out_file = os.path.join(os.path.dirname(__file__), '..', 'main.js')

files = sorted([f for f in os.listdir(src_dir) if f.endswith('.js')])

if not files:
    print('[BUILD] ERROR: No .js files found in src/')
    exit(1)

print(f'[BUILD] Found {len(files)} source files:')
for f in files:
    print(f'  - {f}')

chunks = []
for f in files:
    with open(os.path.join(src_dir, f), 'r', encoding='utf-8') as src:
        content = src.read()
    chunks.append(f'    // ========== {f} ==========')
    chunks.append(content)
    chunks.append('')

output = '\n'.join(chunks) + '\n})();\n'

with open(out_file, 'w', encoding='utf-8') as dest:
    dest.write(output)

print(f'[BUILD] Output: {out_file} ({os.path.getsize(out_file)} bytes)')
print('[BUILD] Done.')
