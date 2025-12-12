package vishdev.ContactManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vishdev.ContactManager.models.deletedContacts;
import vishdev.ContactManager.service.deletedContactsService;

import java.util.List;

@RestController
@RequestMapping("/deletedContacts")
@CrossOrigin(origins = "*")
public class deletedContactsController {

    @Autowired
    private deletedContactsService DCService;

    @PostMapping("/addContact")
    ResponseEntity<deletedContacts> createContact(@RequestBody deletedContacts c){
        return new ResponseEntity<>(DCService.adddeletedContacts(c), HttpStatus.CREATED);
    }

    @GetMapping("/home")
    ResponseEntity<List<deletedContacts>> getAll(){
        return new ResponseEntity<List<deletedContacts>>(DCService.getAllDeletedContacts(),HttpStatus.OK);
    }
}
