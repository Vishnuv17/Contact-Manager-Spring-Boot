package vishdev.ContactManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vishdev.ContactManager.models.Contact;
import vishdev.ContactManager.repository.ContactManagerRepository;

import java.util.List;

@Service
public class ContactManagerService {
    @Autowired
    private ContactManagerRepository contactManagerRepository;

    public Contact addContact(Contact c){
        return contactManagerRepository.save(c);
    }

    public Contact getContact(Long id){
        return contactManagerRepository.findById(id).orElseThrow(()-> new RuntimeException("Conatact not Found"));
    }

    public List<Contact> getAllContacts(){
        return contactManagerRepository.findAll();
    }

    public Contact updateConatct(Contact c){
        return contactManagerRepository.save(c);
    }

    public void deleteContact(Long id){
        contactManagerRepository.delete(getContact(id));
    }

    public Page<Contact> getPageContacts(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return contactManagerRepository.findAll(pageable);
    }
}
