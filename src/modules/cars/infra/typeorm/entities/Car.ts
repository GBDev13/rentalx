import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars", //nome da tabela de relacionamento
    joinColumns: [{ name: "car_id" }], // nome da coluna dentro da nossa tabela de relacionamento que referencia a tabela que estamos (Cars)
    inverseJoinColumns: [{ name: "specification_id" }] // outra coluna que referencia a tabela que estamos colocando aqui no ManyToMany
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };