import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonItem, IonLabel,
  IonButton, IonIcon, IonProgressBar, IonText,
  IonRadioGroup, IonRadio, IonImg, IonTextarea,
  IonRippleEffect
} from '@ionic/angular/standalone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';
import { GeminiAiService } from '../services/gemini-ai.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar,
    IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel,
    IonButton, IonIcon, IonProgressBar, IonText,
    IonRadioGroup, IonRadio, IonImg, IonTextarea,
    IonRippleEffect
  ],
})

export class HomePage {
  prompt = 'Provide a recipe for these baked goods';
  output = '';
  isLoading = false;

  constructor(private geminiService: GeminiAiService) {}

  availableImages = [
    { url: 'assets/images/baked-goods-1.jpg', label: 'Baked Goods 1' },
    { url: 'assets/images/baked-goods-2.jpg', label: 'Baked Goods 2' },
    { url: 'assets/images/baked-goods-3.jpg', label: 'Baked Goods 3' },
  ];

  selectedImage = this.availableImages[0].url;

  get formattedOutput() {
    return this.output.replace(/\n/g, '<br>');
  }

  async onSubmit() {
    if (this.isLoading) return;
    this.isLoading = true;

    try {
      const base64Image = await this.geminiService.getImageAsBase64(this.selectedImage);
      this.output = await this.geminiService.generateRecipe(base64Image, this.prompt);
      
    } catch (e) {
      this.output = `Error: ${e instanceof Error ? e.message : 'Something went wrong'}`;
    }

    this.isLoading = false;
  }

  selectImage(url: string) {
    this.selectedImage = url;
  }
}
