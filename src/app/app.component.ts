import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  ////////////////////////////////////////////////////////////////////////////////////
  constructor(private renderer: Renderer2) {
  }
  ngOnInit(): void {
    // @ts-ignore
    document.querySelector("#imgContainer").addEventListener("wheel", function(event: WheelEvent) {
      event.preventDefault();
      // Déplacer la div de event.deltaX pixels en X
      const element =  document.querySelector("#imgContainer")
      if (element){
        element.scrollLeft -= event.deltaY*4;
        console.log(event.deltaX)
      }
    });

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
  toggleMenuValue : Boolean = true;

  toggleMenu() {
    this.toggleMenuValue = !this.toggleMenuValue;
    let test = document.getElementById("hamburger");
    let nav = document.getElementsByTagName('nav');
    if (test && nav){
      if (this.toggleMenuValue){
        test.classList.remove('fa-bars')
        test.classList.add('fa-xmark')
        nav[0].classList.add('show')
      }else {
        test.classList.add('fa-bars')
        test.classList.remove('fa-xmark')
        nav[0].classList.remove('show')
      }
    }
  }
}
