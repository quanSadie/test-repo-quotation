package com.example.fullCRUD.preset;

import com.example.fullCRUD.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "bleed_preset")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BleedPreset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "bleed_width")
    private int bleedWidth;
    @Column(name = "bleed_length")
    private int bleedLength;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", unique = true)
    private AppUser user;

}
