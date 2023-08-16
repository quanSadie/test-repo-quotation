package com.example.fullCRUD.user_and_prop;

import com.example.fullCRUD.prop.Properties;
import com.example.fullCRUD.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class UserPropertyId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Properties properties;

    // constructors, equals, hashCode
}
