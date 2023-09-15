import {Component, HostListener, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ChezGunes';
  currentSlideIndex = 0;
  slide = [
    "/assets/images/slider/02.jpg",
    "/assets/images/slider/01.JPG",
    "/assets/images/slider/03.jpg",
    "/assets/images/slider/04.jpg"
  ];
  isMenuActive : boolean = false;
  ChangeSlide(direction: number): void {
    this.currentSlideIndex += direction;

    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.slide.length - 1;
    } else if (this.currentSlideIndex >= this.slide.length) {
      this.currentSlideIndex = 0;
    }

    const slideElement: HTMLElement | null = document.querySelector(".slide");
    if (slideElement) {
      slideElement.style.backgroundImage = `url('${this.slide[this.currentSlideIndex]}')`;
    }
  }
  handleScroll(event: Event) {
    const scrollTop = window.scrollY;
    let nav = document.getElementsByTagName("nav");
    let navMenu = document.getElementById("navigationMenu");
      if (scrollTop === 0) {
        nav[0].style.background = "rgba(221, 170, 68,0.6)";
        navMenu!.style.background = "rgba(221, 170, 68,0.6)";
      }else{
        nav[0].style.background = "#ddaa44";
        navMenu!.style.background = "#ddaa44";
      }

  }


  ngOnInit(): void {
    this.detectTheDay();
    window.addEventListener("scroll", this.handleScroll);

  }

  constructor(private renderer: Renderer2) {
  }

  toggleNavigationMenu(){
    this.isMenuActive = !this.isMenuActive;
  }
  // permet de scrool smooth car ens css fonctionnait pas
  scrollToElement($element: any): void {
    // Récupérez la hauteur de votre en-tête
    const navHeight = document.getElementsByTagName('nav')[0].offsetHeight;
    console.log(navHeight)

    // Récupérez la position de l'élément cible par rapport au haut de la page
    const elementPosition = $element.getBoundingClientRect().top;

    // Calculez la position de défilement en soustrayant la hauteur de l'en-tête
    const scrollToPosition = elementPosition + window.scrollY - navHeight;

    // Appliquez une transition CSS pour déplacer la page jusqu'à la nouvelle position
    window.scrollTo({ top: scrollToPosition ,behavior:"smooth"});

  }
  detectTheDay(){
    let date = new Date().getDay();
    let tmp: HTMLElement | null = document.getElementById("scheduleDay");
    console.log("ici")
    if (tmp){
      let children = tmp.children[date]
      this.renderer.setStyle(children,'background','white')
      this.renderer.setStyle(children,'color','black')
      console.log("ici")
    }
  }
}
