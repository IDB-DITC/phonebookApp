import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'

})
export class ContactDetailsComponent implements OnInit {
 

  @Input() viewMode = false;

  @Input() currentContact: Contact = {
    name: '',
    address: '',
    phoneno: '',
    email:''
  };

  message = '';

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
   // public routerLink: RouterLink

  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getContact(this.route.snapshot.params["id"]);
    }
  }

  getContact(id: string): void {
    this.contactService.get(id)
      .subscribe({
        next: (data) => {
          this.currentContact = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  //updatePublished(status: boolean): void {
  //  const data = {
  //    name: this.currentContact.name,
  //    address: this.currentContact.address,
  //    phoneno: this.currentContact.phoneno,
  //    email: this.currentContact.email
  //  };

  //  this.message = '';

  //  this.contactService.update(this.currentContact.id, data)
  //    .subscribe({
  //      next: (res) => {
  //        console.log(res);
  //        this.currentContact.published = status;
  //        this.message = res.message ? res.message : 'The status was updated successfully!';
  //      },
  //      error: (e) => console.error(e)
  //    });
  //}

  updateContact(): void {
    this.message = '';

    this.contactService.update(this.currentContact.id, this.currentContact)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This contact was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteContact(): void {
    this.contactService.delete(this.currentContact.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/contacts']);
        },
        error: (e) => console.error(e)
      });
  }


}
