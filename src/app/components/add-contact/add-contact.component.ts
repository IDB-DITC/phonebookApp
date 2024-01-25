import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  contact: Contact = {
    name: '',
    address: '',
    phoneno: '',
    email:''
  };
  submitted = false;

  constructor(private contactService: ContactService) { }

  saveContact(): void {
    const data = {
      name: this.contact.name,
      address: this.contact.address,
      phoneno: this.contact.phoneno,
      email: this.contact.email,
    };

    this.contactService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newContact(): void {
    this.submitted = false;
    this.contact = {
      name: '',
      address: '',
      phoneno: '',
      email: ''
    };
  }

}
