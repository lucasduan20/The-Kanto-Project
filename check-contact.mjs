import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile('src/app.js','utf8');
const fn=source.slice(source.indexOf('function classifyFormResponse'),source.indexOf("const dialog ="));
const classify=vm.runInNewContext(`(${fn.trim()})`);
assert.equal(classify(true,{success:'false',message:'This form needs Activation.'}),'inactive');
assert.equal(classify(true,{success:'true',message:'Please activate your form'}),'inactive');
assert.equal(classify(true,{success:'true',message:'Form successfully submitted'}),'success');
assert.equal(classify(true,{success:true}),'success');
assert.equal(classify(false,{success:true}),'error');
assert.equal(classify(true,{success:'false'}),'error');
assert.equal(classify(true,{}),'error');
assert.equal(classify(true,null),'error');

const html=await readFile('dist/index.html','utf8');
assert.match(html,/85,200/);
assert.doesNotMatch(html,/85,100|15,000|25,000|55,000|As of August 2026|04 \/ Say Hello|A shared love\. A new beginning|For the love of collecting|Our work includes a completed card donation|the cards you love/);
assert.match(html,/The Kanto Project is a student-founded, 501\(c\)\(3\) Pokémon card nonprofit sharing custom card packs with underprivileged and hospitalized children/);
assert.match(html,/A new home for/);
assert.match(html,/the bulk you don’t want/);
assert.match(html,/<title>The Kanto Project \| Pokémon Card Nonprofit<\/title>/);
assert.match(html,/<meta name="description" content="The Kanto Project is a 501\(c\)\(3\) nonprofit donating Pokémon card packs to underprivileged and hospitalized children through community outreach\."/);
assert.match(html,/<link rel="canonical" href="https:\/\/thekantoproject\.org\/"/);
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.match(html,/https:\/\/formsubmit\.co\/ajax\/lucasduan20@gmail\.com/);
assert.match(html,/mailto:contact@thekantoproject.org/);
assert.match(html,/https:\/\/www\.instagram\.com\/thekantoproject\//);
assert.equal((html.match(/<form /g)||[]).length,1);

const structuredData=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1]||'null');
const graph=structuredData?.['@graph'];
assert.ok(Array.isArray(graph));
const organization=graph.find(x=>x['@type']==='NGO');
assert.equal(organization?.name,'The Kanto Project');
assert.equal(organization?.url,'https://thekantoproject.org/');
assert.equal(organization?.nonprofitStatus,'https://schema.org/Nonprofit501c3');
assert.equal(organization?.email,'contact@thekantoproject.org');
assert.deepEqual(organization?.sameAs,['https://www.instagram.com/thekantoproject/']);
assert.equal(graph.find(x=>x['@type']==='WebSite')?.publisher?.['@id'],organization['@id']);

const photos=await readFile('dist/photos/index.html','utf8');
assert.match(photos,/<link rel="canonical" href="https:\/\/thekantoproject\.org\/photos\/"/);
assert.equal((photos.match(/<h1\b/g)||[]).length,1);
assert.match(html,/href="\/photos\/"[^>]*>In Pictures/);
assert.match(html,/href="\/photos\/"[^>]*>View our photo album/);
assert.match(photos,/Our photo album/);
assert.doesNotMatch(photos,/This album is empty for now/);
assert.match(photos,/href="\/#in-pictures"/);
assert.doesNotMatch(`${html}\n${photos}`,/href="[^"]*\.html"/);
assert.doesNotMatch(`${html}\n${photos}`,/github\.io/i);
await assert.rejects(readFile('dist/photos.html','utf8'),{code:'ENOENT'});
assert.match(await readFile('dist/_redirects','utf8'),/^\/photos\.html \/photos\/ 301$/);
assert.equal((photos.match(/class="photo-trigger"/g)||[]).length,9);
assert.match(photos,/<dialog class="lightbox"/);
assert.doesNotMatch(html,/class="photo-trigger"/);
const photosData=JSON.parse(photos.match(/<script type="application\/json" id="gallery-data">(.*?)<\/script>/s)?.[1]||'[]');
assert.equal(photosData.length,9);
for(const photo of photosData){assert.ok(photo.alt.trim());await access(`dist${photo.src}`);}

const sitemap=await readFile('dist/sitemap.xml','utf8');
assert.match(sitemap,/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]),['https://thekantoproject.org/','https://thekantoproject.org/photos/']);
const robots=await readFile('dist/robots.txt','utf8');
assert.match(robots,/^User-agent: \*\nAllow: \/$/m);
assert.match(robots,/Sitemap: https:\/\/thekantoproject\.org\/sitemap\.xml/);
assert.doesNotMatch(robots,/Disallow:\s*\//);

console.log('Contact behavior, SEO metadata, structured data, crawl files, links, images, and routes passed.');
