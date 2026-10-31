import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const base=dirname(fileURLToPath(import.meta.url));
const root=join(base,'dist');
const projects=JSON.parse(readFileSync(join(base,'content/projects.json'),'utf8'));
const profile=JSON.parse(readFileSync(join(base,'content/profile.json'),'utf8'));
const home=readFileSync(join(root,'index.html'),'utf8');
assert.equal((home.match(/class="panel" /g)||[]).length,projects.length,'All project cards rendered');
assert(home.includes('Radiating Pi engineering emblem'));
assert(home.includes(profile.fullName));
assert(home.includes('mailto:'+profile.email));
assert(home.indexOf('carousel-toolbar')>home.indexOf('Explore project'));
assert(!home.slice(0,home.indexOf('id="about"')).includes('class="about-photo"'));
assert(home.includes('class="about-photo"'));
let pages=0;
function walk(folder){for(const entry of readdirSync(folder,{withFileTypes:true})){
 const path=join(folder,entry.name);
 if(entry.isDirectory())walk(path);
 else if(path.endsWith('.html')) {
  pages++;
  const html=readFileSync(path,'utf8');
  assert(!/@foreach|@if|ProfileData\.|ProjectData\.|blazor\.web/.test(html),'No server template code');
  for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){
   const url=match[1];
   if(!url.startsWith('/'))continue;
   let target=resolve(root,'.'+url);
   if(!existsSync(target)&&!target.endsWith('.html'))target=join(target,'index.html');
   assert(existsSync(target),`Missing local URL ${url} in ${path}`);
  }
 }
}}
walk(root);
for(const p of projects)assert(existsSync(join(root,'project',p.slug,'index.html')));
assert.equal(pages,projects.length+2);
console.log(`Verified ${pages} HTML pages, all local links/assets, ${projects.length} cards, photo placement, and contact links.`);
