package ohgwang.demori.DB.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_pk")
    private int id;

    private String teamId;
    private String uniName;
    private int teamColor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leader")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

}
