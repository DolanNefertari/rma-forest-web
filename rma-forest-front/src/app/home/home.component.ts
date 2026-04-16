import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AboutModel, MisionModel, ServiceModel } from './model/home.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ContactPopupComponent } from '../components/contact-popup/contact-popup.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule,
    ContactPopupComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit{
  @ViewChild("contactPopup") contactPopup!: ContactPopupComponent;
  @ViewChild("footerSection") footerSection!: ElementRef; @ViewChild('statNumbers') statNumbers!: ElementRef; // referencia a los números
  // para animar solo una vez

  private http = inject(HttpClient);
  serviceModel = new ServiceModel();
  aboutModel = new AboutModel();
  misionModel = new MisionModel();

  isFooterVisible = false;
  animatedStats = false; 
  scrolled = false;
  menuOpen = false;
  services: any = {};
  features: any = [];
  activeTab: string = 'inmobiliarias'; 
  misionItems: any = [];
  private autoRotateInterval: any;
  currentFeatureIndex = 0; // para about features
  currentTabIndex = 0;

  tabs = [
    { id: 'inmobiliarias', nombre: 'Inmobiliarias' },
    { id: 'electricas', nombre: 'Empresas Eléctricas' },
    { id: 'propietarios', nombre: 'Pequeños Propietarios' }
  ];

  form = {
    nombre: '',
    email: '',
    mensaje: '',
    privacy: false
  };

  selectedFeature = this.aboutModel.features[0];

  constructor(private cdRef: ChangeDetectorRef) {
    this.services = this.serviceModel.servicios;
    this.features = this.aboutModel.features;
    this.misionItems = this.misionModel.misionItems;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 10;
    if (this.footerSection) {
      const footerTop = this.footerSection.nativeElement.offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;
      this.isFooterVisible = scrollPosition >= footerTop;
    }
    this.cdRef.detectChanges();
    console.log('Scroll detectado:', this.scrolled);
  }

  ngAfterViewInit() {
    this.observeStats();
  }

  ngOnInit() {
    this.startAutoRotate();
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }
  
  onSubmit() {
    if (!this.form.privacy) {
      alert('Debes aceptar la política de privacidad');
      return;
    }
  
    this.http.post('http://localhost:3000/contact/send', {
      nombre: this.form.nombre,
      email: this.form.email,
      mensaje: this.form.mensaje,
      privacy: this.form.privacy
    }).subscribe({
      next: (res: any) => {
        alert(res.message);
        if (res.success) {
          this.form = { nombre: '', email: '', mensaje: '', privacy: false };
        }
      },
      error: () => alert('Error de conexión con el servidor')
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    // Evita el scroll del body cuando el menú está abierto
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }


  openContactPopup() {
    this.contactPopup.open();
  }

  startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      // Rotar features del about
      this.currentFeatureIndex = (this.currentFeatureIndex + 1) % this.features.length;
      this.selectFeature(this.features[this.currentFeatureIndex]);
      
      // Rotar tabs de servicios
      this.currentTabIndex = (this.currentTabIndex + 1) % this.tabs.length;
      this.activeTab = this.tabs[this.currentTabIndex].id;
      
      this.cdRef.detectChanges();
    }, 3000); // Cambia cada 5 segundos
  }

  private observeStats() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedStats) {
          this.animateStats();
          this.animatedStats = true;
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    if (this.statNumbers) {
      observer.observe(this.statNumbers.nativeElement);
    }
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  // Pausar al hacer hover en la sección
  pauseAutoRotate() {
    this.stopAutoRotate();
  }

  // Reanudar al salir del hover
  resumeAutoRotate() {
    this.startAutoRotate();
  }

  private animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0');
      const format = stat.getAttribute('data-format') || target.toString();
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easing easeOutCubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeProgress);
        
        // Si es el último paso, mostrar el formato final
        if (progress >= 1) {
          stat.textContent = format;
          return;
        }
        
        stat.textContent = current.toString();
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    });
  }
  
  // Reiniciar animación al cambiar de card
  selectFeature(feature: any) {
    this.selectedFeature = feature;
    // Reiniciar bandera para permitir animación
    this.animatedStats = false;
    // Pequeño delay para que el DOM se actualice
    setTimeout(() => {
      this.animateStats();
      this.animatedStats = true;
    }, 100);
  } 
}
