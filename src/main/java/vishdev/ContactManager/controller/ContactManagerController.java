package vishdev.ContactManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vishdev.ContactManager.models.Contact;
import vishdev.ContactManager.service.ContactManagerService;

import java.util.List;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "*")
public class ContactManagerController {
    @Autowired
    private ContactManagerService contactManagerService;

    @PostMapping("/addContact")
    ResponseEntity<Contact> createContact(@RequestBody Contact c){
        return new ResponseEntity<>(contactManagerService.addContact(c), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    ResponseEntity<Contact> getContactById(@PathVariable Long id){
        try {
            return new ResponseEntity<>(contactManagerService.getContact(id),HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/home")
    ResponseEntity<List<Contact>> getAll(){
        return new ResponseEntity<List<Contact>>(contactManagerService.getAllContacts(),HttpStatus.OK);
    }


    @PutMapping()
    ResponseEntity<Contact> updateContact(@RequestBody Contact c){
        try {
            return new ResponseEntity<>(contactManagerService.updateConatct(c),HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    void updateContact(@PathVariable Long id){
        contactManagerService.deleteContact(id);
    }

    @GetMapping
    ResponseEntity<Page<Contact>> pageContacts(@RequestParam int page_no){
        int page_size=10;
        return new ResponseEntity<>(contactManagerService.getPageContacts(page_no,page_size),HttpStatus.OK);
    }


}
