import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as Hammer from 'hammerjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////
  constructor(private renderer: Renderer2) {
  }
  @ViewChild('imgContainer') imgContainer!: ElementRef;
  ngOnInit(): void {
    // gallery.ts
    const hammer = new Hammer(this.imgContainer.nativeElement);
    hammer.get('doubletap').recognizeWith('pan');
    hammer.on('doubletap', (e: HammerInput) => {
      // Gestionnaire d'événement doubletap (peut être vide)
    });

    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    hammer.on('panstart', (e: HammerInput) => {
      isDragging = true;
      startX = e.center.x;
      scrollLeft = this.imgContainer.nativeElement.scrollLeft;
      this.imgContainer.nativeElement.style.cursor = 'grabbing';
    });

    hammer.on('panmove', (e: HammerInput) => {
      if (!isDragging) return;
      const x = e.center.x;
      const walk = (x - startX) * 2;
      this.imgContainer.nativeElement.scrollLeft = scrollLeft - walk;
    });

    hammer.on('panend', () => {
      isDragging = false;
      this.imgContainer.nativeElement.style.cursor = 'grab';
    });

// Attendre que le DOM soit prêt
//     document.addEventListener("DOMContentLoaded", () => {
//       // Sélectionnez votre conteneur d'images
//       const imgContainer = document.getElementById("imgContainer");
//       const makeyframe = document.querySelector(".fade-in");
//       let isDragging = false;
//       let startX: number;
//       let scrollLeft: number;
//
//
//       const startDrag = (e: Event) => {
//         e.preventDefault();
//         isDragging = true;
//         const event = e instanceof MouseEvent ? e : (e as TouchEvent).touches[0];
//         startX = event.pageX - (imgContainer?.offsetLeft || 0);
//         scrollLeft = imgContainer?.scrollLeft || 0;
//         imgContainer?.style.setProperty("cursor", "grabbing");
//       };
//
//       const handleDrag = (e: Event) => {
//         if (!isDragging) return;
//         e.preventDefault();
//         const event = e instanceof MouseEvent ? e : (e as TouchEvent).touches[0];
//         const x = event.pageX - (imgContainer?.offsetLeft || 0);
//         const walk = (x - startX) * 2; // Ajustez le facteur pour contrôler la vitesse de défilement
//         if (imgContainer) {
//           imgContainer.scrollLeft = scrollLeft - walk;
//         }
//       };
//
//       const stopDrag = () => {
//         isDragging = false;
//         imgContainer?.style.setProperty("cursor", "grab");
//       };
//
//       imgContainer?.addEventListener("mousedown", startDrag);
//       imgContainer?.addEventListener("mousemove", handleDrag);
//       imgContainer?.addEventListener("mouseup", stopDrag);
//
//       imgContainer?.addEventListener("touchstart", startDrag);
//       imgContainer?.addEventListener("touchmove", handleDrag);
//       imgContainer?.addEventListener("touchend", stopDrag);
//
//
//       imgContainer?.addEventListener("mousedown", startDrag);
//       imgContainer?.addEventListener("touchstart", startDrag);
//       document.addEventListener("mousemove", handleDrag);
//       document.addEventListener("touchmove", handleDrag, {passive: false});
//       document.addEventListener("mouseup", stopDrag);
//       document.addEventListener("touchend", stopDrag);
//       document.addEventListener("mouseleave", stopDrag);
//     });
    const scrollToTopButton = document.getElementById("scrollToTopButton");

// Ajoutez un gestionnaire d'événements pour faire défiler vers le haut lorsque le bouton est cliqué
    if (scrollToTopButton) {
      scrollToTopButton.addEventListener("click", () => {
        this.scrollToTop();
      });
    }

    /////////////
    // Récupérez l'élément avec l'ID "scheduleDay"
    const scheduleElement = document.getElementById("scheduleDay");

// Vérifiez si l'élément existe
    if (scheduleElement !== null) {
      // Récupérez la date actuelle
      const currentDate = new Date();
      // Obtenez le jour de la semaine (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi)
      const currentDay = currentDate.getDay();

      // Sélectionnez le <li> correspondant au jour actuel en utilisant l'indice (0 pour Lundi, 1 pour Mardi, etc.)
      const scheduleList = scheduleElement.getElementsByTagName("li");

      // Assurez-vous que l'indice est valide (entre 0 et 6)
      if (currentDay >= 0 && currentDay < scheduleList.length) {
        // Ajoutez la classe "current-day" au <li> correspondant
        scheduleList[currentDay].classList.add("current-day");
      }
    }
  }
  scrollToTop(): void {
    // Utilisez window.scrollTo() pour faire défiler la page vers le haut
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  currentDay: number = 0; // Variable pour stocker le jour de la semaine actuel (0 pour Dimanche, 1 pour Lundi, etc.)
  toggleMenuValue : Boolean = false;
  toggleMenu() {
    this.toggleMenuValue = !this.toggleMenuValue;
    console.log(this.toggleMenuValue)
  }
}
