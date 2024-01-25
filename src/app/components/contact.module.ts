import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@NgModule({
  declarations: [AddContactComponent,
    ContactListComponent,
    ContactDetailsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [AddContactComponent,
    ContactListComponent,
    ContactDetailsComponent]

})
export class ContactModule { }
