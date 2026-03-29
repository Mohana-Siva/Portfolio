const fs = require('fs');

let css = fs.readFileSync('index.css', 'utf8');

// Update .about-card
css = css.replace(/\.about-card\s*\{[\s\S]*?backdrop-filter:\s*blur\(10px\);\s*-webkit-backdrop-filter:\s*blur\(10px\);\s*overflow:\s*hidden;\s*transition:\s*border-color\s*0\.25s\s*ease,\s*box-shadow\s*0\.25s\s*ease,\s*transform\s*0\.25s\s*ease;\s*\}/, 
`.about-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  background: rgba(34, 34, 59, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease;
  position: relative;
}`);

// Update .about-card:hover
css = css.replace(/\.about-card:hover\s*\{[\s\S]*?transform:\s*translateY\(-3px\);\s*\}/,
`.about-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(135deg, rgba(201, 173, 167, 0.4) 0%, rgba(255,255,255,0) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.about-card:hover {
  background: rgba(34, 34, 59, 0.55);
  transform: translateY(-5px);
  box-shadow: 0 15px 45px rgba(201, 173, 167, 0.2);
  border-color: rgba(201, 173, 167, 0.5);
}

.about-card:hover::before {
  opacity: 1;
}`);

// Update .about-text
css = css.replace(/\.about-text\s*\{[\s\S]*?color:\s*rgba\(242,\s*233,\s*228,\s*0\.95\);\s*\}/,
`.about-text {
  line-height: 1.9;
  letter-spacing: 0.3px;
  font-size: 1.05rem;
  color: rgba(242, 233, 228, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.about-text:first-line {
  font-size: 1.15rem;
  font-weight: 500;
  color: #C9ADA7;
}`);

// Update .edu-avatar
css = css.replace(/\.edu-avatar\s*\{\s*width:\s*52px;\s*height:\s*52px;\s*\}/,
`.edu-avatar {
  width: 58px;
  height: 58px;
  object-fit: contain;
  background: #fff;
  border-radius: 50%;
  border: 3px solid rgba(201, 173, 167, 0.8);
  box-shadow: 0 0 15px rgba(201, 173, 167, 0.4), inset 0 0 10px rgba(0,0,0,0.2);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
}

.edu-event:hover .edu-avatar {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 0 25px rgba(201, 173, 167, 0.9), inset 0 0 10px rgba(0,0,0,0.2);
}`);

fs.writeFileSync('index.css', css);
console.log('Update successful');
