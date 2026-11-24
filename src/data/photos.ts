// Real photographs of Shalom C. Ernest, served from public/src/assets/images.
const dir = '/src/assets/images/';
const p = (file: string) => encodeURI(dir + file);

export const PHOTOS = {
  stageWide:    p('LLS_2026-92.jpg'),                         // mid-stage, summit, others behind
  stagePodium:  p('LLS_2026-124.jpg'),                        // podium, green/blue summit backdrop
  podiumBlue:   p('RockyEmmyStudio 9015Apr 29 2026 (1).jpg'), // podium, blue "SU" backdrop
  podiumBlue2:  p('RockyEmmyStudio 9014Apr 29 2026.jpg'),
  worldMap:     p('DJI_20000108200006_0192_D.JPG'),           // podium in front of globe map
  relaxed:      p('IMG_1195.JPG'),                            // seated, smiling, white shirt
  roscongress:  p('IMG_8937.jpg'),                            // outdoors at Roscongress
  portraitBW:   p('KEN_3739 copy.jpg'),                       // black & white studio portrait
  withGuest:    p('IMG-20250619-WA0045.jpg'),                 // suit, with a guest
  award:        p('20260629_070734.jpg'),                     // group with chain of office
  handshake:    p('Screenshot_20250830-193038_Instagram.jpg'),// receiving a document on stage
  whiteboard:   p('_DSC0794.jpg'),                            // teaching at a flipchart
  classroom:    p('_DSC0988.jpg'),                            // presenting in a classroom
  outdoors:     p('_DSC9895.jpg'),                            // standing beside a guest outdoors
  conference:   p('shalom_ernest_hero_1782810399094.jpg'),    // seated at an international conference
};
