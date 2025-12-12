package vishdev.ContactManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vishdev.ContactManager.models.Contact;

public interface ContactManagerRepository extends JpaRepository<Contact,Long> {
}
