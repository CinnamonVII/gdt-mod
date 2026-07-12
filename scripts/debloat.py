import os

src_dir = os.path.join(os.path.dirname(__file__), '..', 'src')

replacements = [
    # Card / Flex
    ('style="background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); padding:16px; display:flex; flex-direction:column; gap:8px; border-radius:6px;"', 'class="cs-card" style="display:flex; flex-direction:column; gap:8px;"'),
    ('style="background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.15); border-left:4px solid \' + urgencyColor + \'; padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-radius:6px;"', 'class="cs-card cs-card-flex" style="border-left:4px solid \' + urgencyColor + \';"'),
    ('style="background:#fff; border:2px solid #bdc3c7; padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"', 'class="cs-card cs-card-flex" style="padding:12px; margin-bottom:8px;"'),
    ('style="background:#fff; border:2px solid #bdc3c7; padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;\' + (isOk?\'\':\'opacity:0.6\') + \'"', 'class="cs-card cs-card-flex" style="padding:12px; margin-bottom:8px;\' + (isOk?\'\':\'opacity:0.6\') + \'"'),
    ('style="background:#fff; border:2px solid #bdc3c7; border-left:4px solid \' + (plat.logoColor || \'#555\') + \'; padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"', 'class="cs-card cs-card-flex" style="padding:12px; margin-bottom:8px; border-left:4px solid \' + (plat.logoColor || \'#555\') + \';"'),

    # Typography
    ('style="font-weight:bold; font-size:11pt; color:#2c3e50;"', 'class="cs-text-title"'),
    ('style="font-size:9pt; color:#7f8c8d;"', 'class="cs-text-muted"'),
    ('style="color:#27ae60; font-weight:bold;"', 'class="cs-text-green cs-text-bold"'),
    ('style="color:#e74c3c; font-weight:bold; font-size:9pt; text-transform:uppercase;"', 'class="cs-text-red cs-text-bold" style="font-size:9pt; text-transform:uppercase;"'),
    
    # Table
    ('style="width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:1px solid #bdc3c7; margin-bottom:20px; border-radius:6px; overflow:hidden;"', 'class="cs-table"'),
    ('style="width:100%; border-collapse:collapse; font-size:9pt; background:#fff; border:2px solid #555;"', 'class="cs-table" style="border:2px solid #555;"'),
    ('style="background:#34495e; color:white; text-transform:uppercase; letter-spacing:0.5px;"', ''),
    ('style="background:\' + bg + \'; border-bottom:1px solid #bdc3c7;"', 'style="background:\' + bg + \';"'),
    ('<th style="padding:10px; text-align:left;">', '<th>'),
    ('<td style="padding:8px;">', '<td>'),
    ('<td style="padding:8px; font-weight:bold; color:#2c3e50;">', '<td class="cs-text-title">'),
]

files_to_process = ['17_ui_projects.js', '18_ui_distribution.js', '16_ui_subsidiaries.js']

for fname in files_to_process:
    fpath = os.path.join(src_dir, fname)
    if not os.path.exists(fpath): continue
    
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Debloat replacements completed.")
