package com.example.fullCRUD.user_and_paper;

import com.example.fullCRUD.paper.PaperType;
import com.example.fullCRUD.prop.Properties;
import com.example.fullCRUD.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class UserPaperID implements Serializable {
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "pt_id", updatable = false)
    private PaperType paperType;

    // constructors, equals, hashCode
}
