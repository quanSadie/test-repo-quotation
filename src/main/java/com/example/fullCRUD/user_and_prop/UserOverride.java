package com.example.fullCRUD.user_and_prop;

import com.example.fullCRUD.prop.Properties;
import com.example.fullCRUD.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_overrides")
public class UserOverride {
    @EmbeddedId
    private UserPropertyId id;

    @Column(name = "number_override")
    private double numberOverride;


    // constructors, getters, setters
}

