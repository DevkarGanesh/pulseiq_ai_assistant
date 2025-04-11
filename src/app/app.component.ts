// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from './components/header/header.component';
// import { CommonModule } from '@angular/common';
// import { ChatService } from './services/chat.service';
// @Component({
//   standalone: true,
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   imports: [HeaderComponent, CommonModule],
// })
// export class AppComponent implements OnInit{
//   constructor(
//     private chatService: ChatService
//   ){}

//   title = 'chat';
//   messages: { sender: 'user' | 'bot'; text: string }[] = [];
//   data:any;

//   ngOnInit(): void {

//   }

//   sendMessage(userText: string) {
//     this.getChatReply(userText);
//   }

//   getChatReply(userText: string){
//     this.chatService.getResponse(userText).subscribe({
//       next:(res:any)=>{
//         console.log(res)
//         this.data=res;
//         console.log("current data",this.data);
//       },
//       error:(err:any)=>{
//         console.error(err);
//       },
//       complete:()=>{
//         'Chat Executed'
//       }
//     });
//   }

//   simulateBotReply(userText: string) {
//     const fullResponse = `Please visit the link and follow this in the given direction https://google.com/`;
//     let reply = '';
//     this.messages.push({ sender: 'bot', text: '' });
//     const botIndex = this.messages.length - 1;

//     let i = 0;
//     const interval = setInterval(() => {
//       if (i < fullResponse.length) {
//         reply += fullResponse[i];
//         this.messages[botIndex].text = reply;
//         i++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 40);
//   }

//   linkify(text: string): string {
//     const urlRegex = /((https?:\/\/[^\s]+))/g;
//     return text.replace(
//       urlRegex,
//       (url) => `<a class="links" href="${url}" target="_blank" rel="noopener noreferrer">
//          <button class="link-button">Open Link</button>
//        </a>`
//     );
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from './components/header/header.component';
// import { CommonModule } from '@angular/common';
// import { ChatService } from './services/chat.service';
// import { DecryptService } from './services/decrypt.service';
// import { environment } from '../environment/environmant';
// @Component({
//   standalone: true,
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   imports: [HeaderComponent, CommonModule],
// })
// export class AppComponent implements OnInit {
//   constructor(private chatService: ChatService,
//     private decryptService: DecryptService
//   ) {}

//   title = 'chat';

//   apiMessage: string = '';
//   itineraries: any[] = [];
//   itineraryUrls: { [key: string]: string } = {};

//   ngOnInit(): void {
//     this.getChatReply('userText');
//   }

//   sendMessage(userText: string) {
//     if (!userText.trim()) return;
//     this.getChatReply(userText);
//   }

//   getChatReply(userText: string) {
//     this.chatService.getResponse(userText).subscribe({
//       next: (res: any) => {
//         console.log('Response:', res);
//         this.apiMessage = res?.message || '';
//         this.itineraries = res?.itenanray || [];
//         this.itineraryUrls = {}; // reset

//         this.itineraries.forEach((trip) => {
//           this.decryptService
//             .getDecryptItNo(trip.itinerary_no)
//             .subscribe((encryptedNo: string) => {
//               // this.itineraryUrls[trip.itinerary_no] = `${environment.redirectDomain}/${encryptedNo}`;
//               this.itineraryUrls[trip.itinerary_no] = `${environment.redirectDomain}/example`;
//             });
//         });
//       },
//       error: (err: any) => {
//         console.error(err);
//         this.apiMessage = 'Oops! Something went wrong.';
//         this.itineraries = [];
//         this.itineraryUrls = {};
//       },
//       complete: () => {
//         console.log('Chat completed');
//       }
//     });
//   }

//   getUrl(itNo:any){
//     this.decryptService.getDecryptItNo(itNo).subscribe((encrypedNo:any)=>{
//       // return `${environment.redirectDomain}/encrypedNo`

//       return `${environment.redirectDomain}/encrypedNo`;
//     });
//   }
// }

// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from './components/header/header.component';
// import { CommonModule } from '@angular/common';
// import { ChatService } from './services/chat.service';
// import { DecryptService } from './services/decrypt.service';
// import { environment } from '../environment/environmant';

// interface Message {
//   content: string;
//   type: 'user' | 'bot';
//   itineraries?: any[];
// }

// @Component({
//   standalone: true,
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   imports: [HeaderComponent, CommonModule],
// })
// export class AppComponent implements OnInit {
//   @ViewChild('userMessageInput') userMessageInput!: ElementRef;
//   @ViewChild('chatBodyRef') chatBodyRef!: ElementRef;

//   constructor(
//     private chatService: ChatService,
//     private decryptService: DecryptService
//   ) {}

//   title = 'chat';
//   messages: Message[] = [];
//   itineraryUrls: { [key: string]: string } = {};
//   isLoading = false;
//   showCursor: boolean = true;
//   sampleSearches = [
//     "Romantic getaway in Paris for 5 days",
//     "2-week backpacking trip from London to Tokyo",
//     "Family vacation from San Francisco to Sydney in June",
//     "Historical tour from Chicago to Rome with sightseeing",
//     "Beach holiday from Miami to Barcelona with kids",
//     "Budget Europe trip: Amsterdam, Berlin & Prague",
//     "Luxury honeymoon in Maldives from New York",
//     "Solo travel adventure from LA to Bangkok",
//     "Weekend escape from Delhi to Dubai",
//     "Nature trip from Toronto to New Zealand"
//   ];

//   ngOnInit(): void {

//     // this.messages.push({
//     //   content: 'Hello! How can I help you plan your next vacation?',
//     //   type: 'bot'
//     // });
//   }

//   sendMessage(userText: string) {
//     if (!userText.trim()) return;

//     // Add user message to chat
//     this.messages.push({
//       content: userText,
//       type: 'user'
//     });

//     // Clear input
//     if (this.userMessageInput) {
//       this.userMessageInput.nativeElement.value = '';
//     }

//     this.isLoading = true;

//     // Get response from API
//     this.getChatReply(userText);

//     // Scroll to bottom after view update
//     setTimeout(() => this.scrollToBottom(), 100);
//   }

//   getChatReply(userText: string) {
//     this.chatService.getResponse(userText).subscribe({
//       next: (res: any) => {
//         this.isLoading = false;
//         console.log('Response:', res);

//         const botMessage: Message = {
//           content: res?.message || 'I found some travel options for you.',
//           type: 'bot'
//         };

//         // Add itineraries if present
//         if (res?.itenanray && res.itenanray.length > 0) {
//           botMessage.itineraries = res.itenanray;

//           // Process URLs for each itinerary
//           res.itenanray.forEach((trip: any) => {
//             this.decryptService
//               .getDecryptItNo(trip.itinerary_no)
//               .subscribe((encryptedNo: string) => {
//                 this.itineraryUrls[trip.itinerary_no] = `${environment.redirectDomain}/example`;
//                 // Force view update
//                 this.messages = [...this.messages];
//               });
//           });
//         }

//         this.messages.push(botMessage);
//         setTimeout(() => this.scrollToBottom(), 100);
//       },
//       error: (err: any) => {
//         this.isLoading = false;
//         console.error(err);
//         this.messages.push({
//           content: 'Oops! Something went wrong. Please try again.',
//           type: 'bot'
//         });
//         setTimeout(() => this.scrollToBottom(), 100);
//       }
//     });
//   }

//   scrollToBottom(): void {
//     if (this.chatBodyRef) {
//       const element = this.chatBodyRef.nativeElement;
//       element.scrollTop = element.scrollHeight;
//     }
//   }

// }

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { ChatService } from './services/chat.service';
import { DecryptService } from './services/decrypt.service';
import { environment } from '../environment/environmant';
import { XmlConfigService } from './services/xml-config.service';

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
  imports: [HeaderComponent, CommonModule],
})
export class AppComponent implements OnInit {
  @ViewChild('userMessageInput') userMessageInput!: ElementRef;
  @ViewChild('chatBodyRef') chatBodyRef!: ElementRef;
  @ViewChild('typingInput') typingInput!: ElementRef;

  constructor(
    private chatService: ChatService,
    private decryptService: DecryptService,
    private xmlConfigService: XmlConfigService
  ) {}

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
  getEnquiryUrl(){
    this.xmlConfigService.getValueByKey('enquiryurl').subscribe(
      (value)=>{
        this.enquiryUrl = value;
      },
      (err:any)=>{
        console.error("Unable to find config");
      }
    );
  }

  getChatReply(userText: string) {
    this.chatService.getResponse(userText).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        console.log('Response:', res);

        const botMessage: Message = {
          content:
            res?.message ||
            'Here are a few handpicked travel ideas we think you’ll love based on what you shared! Each one is crafted to give you a unique experience, with a perfect blend of adventure, comfort, and discovery. Let us know if any of these catch your eye!',
          type: 'bot',
        };

        if (res?.recommendations && res.recommendations.length > 0) {
          botMessage.itineraries = res.recommendations;

          res.recommendations.forEach((trip: any) => {
            console.log('Calling decryption for', trip.holiday_formatted_id);

            if(trip.holiday_formatted_id.endsWith('-W')){
              this.itineraryUrls[
                trip.holiday_formatted_id
              ] = trip.holiday_url;
              this.messages = [...this.messages];
            }
            else{
              this.decryptService
              .getEncryptItNo(trip.holiday_formatted_id)
              .subscribe((encryptedNo: string) => {
                this.itineraryUrls[
                  trip.holiday_formatted_id
                ] = `${environment.redirectDomain}/${encryptedNo}`;
                this.messages = [...this.messages];
              });
            }
           
          });
        }

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
      element.scrollTop = element.scrollHeight;
    }
  }
}
