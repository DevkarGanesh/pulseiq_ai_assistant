import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { ChatService } from './services/chat.service';
import { DecryptService } from './services/decrypt.service';
import { environment } from '../environment/environmant';
import { XmlConfigService } from './services/xml-config.service';
import { MarkdownComponent } from 'ngx-markdown';

interface Message {
  content: string;
  type: 'user' | 'bot';
  itineraries?: any[];
}

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, CommonModule, MarkdownComponent],
})
export class AppComponent implements OnInit {
  @ViewChild('userMessageInput') userMessageInput!: ElementRef;
  @ViewChild('chatBodyRef') chatBodyRef!: ElementRef;
  @ViewChild('typingInput') typingInput!: ElementRef;

  constructor(
    private chatService: ChatService,
    private decryptService: DecryptService,
    private xmlConfigService: XmlConfigService
  ) { }

  title = 'chat';
  messages: Message[] = [];
  itineraryUrls: { [key: string]: string } = {};
  isLoading = false;
  showCursor: boolean = true;
  currentTypingText: string = '';
  typingIndex: number = 0;
  typingSpeed: number = 100; // milliseconds per character
  typingTimeout: any;
  currentSampleIndex: number = 0;
  enquiryUrl: string | null = null;
  sampleSearches = [
    'Paris getaway for 5 days',
    'Backpacking: London to Tokyo',
    'SF to Sydney family trip in June',
    'Rome history tour from Chicago',
    'Miami to Barcelona beach trip',
    'Budget Eurotrip: AMS, BER, PRG',
    'Maldives honeymoon from NYC',
    'Solo trip: LA to Bangkok',
    'Delhi to Dubai weekend escape',
    'Nature trip: Toronto to NZ',
  ];

  ngOnInit(): void {

    this.getEnquiryUrl();
    // // Start the typing effect
    // this.startTypingEffect();

    // // Blink cursor effect
    // setInterval(() => {
    //   this.showCursor = !this.showCursor;
    // }, 500);
  }

  startTypingEffect(): void {
    // Clear any existing typing animation
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    // Reset typing state
    this.typingIndex = 0;
    this.currentTypingText = '';

    // Get the next sample text
    const textToType = this.sampleSearches[this.currentSampleIndex];

    // Start typing animation
    this.typeNextCharacter(textToType);

    // Update index for next time
    this.currentSampleIndex =
      (this.currentSampleIndex + 1) % this.sampleSearches.length;
  }

  typeNextCharacter(fullText: string): void {
    if (this.typingIndex < fullText.length) {
      // Add the next character
      this.currentTypingText += fullText.charAt(this.typingIndex);
      this.typingIndex++;

      // Schedule the next character
      this.typingTimeout = setTimeout(() => {
        this.typeNextCharacter(fullText);
      }, this.typingSpeed);
    } else {
      // Finished typing this sample, pause before starting the next one
      this.typingTimeout = setTimeout(() => {
        this.startTypingEffect();
      }, 2000); // Wait 2 seconds before switching to next sample
    }
  }

  sendMessage(userText: string) {
    if (!userText.trim()) return;

    // Add user message to chat
    this.messages.push({
      content: userText,
      type: 'user',
    });

    // Clear input
    if (this.userMessageInput) {
      // this.userMessageInput.nativeElement.value = '';
      const inputEl = this.userMessageInput.nativeElement as HTMLTextAreaElement;
      inputEl.value = '';
      inputEl.blur();
    }

    this.isLoading = true;

    // Get response from API
    this.getChatReply(userText);

    // Scroll to bottom after view update
    setTimeout(() => this.scrollToBottom(), 100);

  }
  getEnquiryUrl() {
    this.xmlConfigService.getValueByKey('enquiryurl').subscribe(
      (value) => {
        this.enquiryUrl = value;
      },
      (err: any) => {
        console.error("Unable to find config");
      }
    );
  }

  getChatReply(userText: string) {
    this.chatService.getResponse(userText).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        // console.log('Response:', res);

        const botMessage: Message = {
          content:
            res?.data?.ai_response ||
            '',
          type: 'bot',

        };

        // if (res?.recommendations && res.recommendations.length > 0) {
        //   botMessage.itineraries = res.recommendations;

        //   res.recommendations.forEach((trip: any) => {
        //     // console.log('Calling decryption for', trip.holiday_formatted_id);

        //     if (trip.holiday_formatted_id.endsWith('-W')) {
        //       this.itineraryUrls[
        //         trip.holiday_formatted_id
        //       ] = trip.holiday_url;
        //       this.messages = [...this.messages];
        //     }
        //     else{
        //       this.decryptService
        //       .getEncryptItNo(trip.holiday_formatted_id)
        //       .subscribe((encryptedNo: string) => {
        //         this.itineraryUrls[
        //           trip.holiday_formatted_id
        //         ] = `${environment.redirectDomain}/${encryptedNo}`;
        //         this.messages = [...this.messages];
        //       });
        //     }

        //   });
        // }

        this.messages.push(botMessage);
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error(err);
        this.messages.push({
          content: 'Oops! Something went wrong. Please try again.',
          type: 'bot',
        });
        setTimeout(() => this.scrollToBottom(), 100);
      },
    });
  }

  scrollToBottom(): void {
    if (this.chatBodyRef) {
      const element = this.chatBodyRef.nativeElement;
      // Scroll smoothly
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  adjustTextareaHeight(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
