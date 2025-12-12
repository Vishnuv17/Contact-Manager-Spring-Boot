package vishdev.ContactManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vishdev.ContactManager.models.deletedContacts;
import vishdev.ContactManager.repository.deletedContactsRepository;

import java.util.List;

@Service
public class deletedContactsService {
    @Autowired
    private deletedContactsRepository deletedcontactsRepository;

    public deletedContacts adddeletedContacts(deletedContacts dc) {
        return deletedcontactsRepository.save(dc);
    }
    public List<deletedContacts> getAllDeletedContacts(){
        return  deletedcontactsRepository.findAll();
    }
}
