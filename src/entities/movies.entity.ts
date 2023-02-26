import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm'


// Engloba a classe de "Movie" em uma "Entity"
@Entity('movies') // A tabela no banco de dados se chamará users
class Movie {

    @PrimaryGeneratedColumn('increment') //  Vai dizer ao banco de dados para gerar uma coluna primary key SERIAL
    id: number

    @Column({ length: 50, unique: true })
    name: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column()
    duration: number

    @Column()
    price: number


}

export { Movie }