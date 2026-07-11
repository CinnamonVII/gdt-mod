#!/usr/bin/env python3
import os

src_file = 'main.original.js'
out_dir = 'src'

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

with open(src_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Using exact 1-based line numbers mapped to 0-based list indices
# Line N -> Index N-1
bounds = [
    {'name': '00_polyfills.js', 'line': 1},
    {'name': '01_styles.js', 'line': 63},
    {'name': '02_helpers.js', 'line': 90},
    {'name': '03_dataInit.js', 'line': 221},
    {'name': '04_coreHooks.js', 'line': 1189},
    {'name': '05_franchises.js', 'line': 1247},
    {'name': '06_media.js', 'line': 1456},
    {'name': '07_studios.js', 'line': 1671},
    {'name': '08_streaming.js', 'line': 1811},
    {'name': '09_theater.js', 'line': 1855},
    {'name': '10_grid.js', 'line': 1922},
    {'name': '11_competitors.js', 'line': 2224},
    {'name': '12_ui_base.js', 'line': 3114},
    {'name': '13_ui_franchises.js', 'line': 3483},
    {'name': '14_ui_media.js', 'line': 3750},
    {'name': '15_ui_market.js', 'line': 3927},
    {'name': '16_ui_subsidiaries.js', 'line': 4022},
    {'name': '17_ui_projects.js', 'line': 4408},
    {'name': '18_ui_distribution.js', 'line': 5097}
]

l_end = 5765 # '})();'

for i in range(len(bounds)):
    start_idx = bounds[i]['line'] - 1
    end_idx = bounds[i+1]['line'] - 1 if i < len(bounds) - 1 else l_end - 1
    
    chunk_lines = lines[start_idx:end_idx]
    
    while len(chunk_lines) > 0 and chunk_lines[-1].strip() == '':
        chunk_lines.pop()
        
    out_path = os.path.join(out_dir, bounds[i]['name'])
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(''.join(chunk_lines) + '\n')
    print(f"Wrote {bounds[i]['name']} (lines {bounds[i]['line']} to {end_idx})")

print("Extraction complete.")
