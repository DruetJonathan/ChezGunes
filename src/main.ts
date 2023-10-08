import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// Dans votre fichier JavaScript

window.addEventListener('scroll', function() {
  // Obtenez la position de défilement verticale
  const scrollPosition = window.scrollY;

  // Obtenez l'élément parralaxSection
  const parallaxSection = document.getElementById('parralaxSection');

  // Vérifiez si l'élément existe avant d'accéder à sa propriété offsetHeight
  if (parallaxSection) {
    const parallaxSectionHeight = parallaxSection.offsetHeight;

    // Appliquez un effet de parallaxe en ajustant la position de fond du body
    document.body.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
  }
});




