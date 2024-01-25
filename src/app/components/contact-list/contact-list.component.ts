import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  currentContact: Contact = {};
  currentIndex = -1;
  name = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.retrieveContacts();
  }

  retrieveContacts(): void {
    this.contactService.getAll()
      .subscribe({
        next: (data) => {
          this.contacts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveContacts();
    this.currentContact = {};
    this.currentIndex = -1;
  }

  setActiveContact(contact: Contact, index: number): void {
    this.currentContact = contact;
    this.currentIndex = index;
  }

  removeAllContacts(): void {
    this.contactService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentContact = {};
    this.currentIndex = -1;

    this.contactService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.contacts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
