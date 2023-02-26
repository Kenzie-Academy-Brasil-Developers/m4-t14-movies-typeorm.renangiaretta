import 'dotenv/config'
import 'reflect-metadata'
//  classe dataSourceOptions ajuda a escrever o json de configurações e classe dataSource ajuda a conectar com o banco de dados (parecido com o client do pg).
import { DataSource, DataSourceOptions } from 'typeorm' 
import path from 'path'


// dataSourceConfig pode acessar qualquer tipo de banco de dados, por isso dizemos que vamos utilizar o "type": "postgres".
// devemos dizer onde vai ser a conecão com o banco de dados. "url": process.env.DATABASE_URL ( utilizamos o .env ).
// sinchronyze: false -> serve para NÃO atualizar automaticamente o banco de dados. Se estiver "true", não será possivel gerar as migrations. 
// logging: true ->  Serve para o typeorm escrever o log das querys do banco de dados no console.
// migrations: [] -> Caminho das migrations
// entities: [] -> Caminho das entities
const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath = path.join(__dirname, './entities/**.{ts,js}')
    const migrationsPath = path.join(__dirname, './migrations/**.{ts,js}')

    const dbUrl: string | undefined = process.env.DATABASE_URL

    if (!dbUrl) {
        throw new Error ('Env var DATABASE_URL does not exists.')
    }

    const nodeEnv: string | undefined = process.env.NODE_ENV

    // sera utilizado um banco de dados diferente para rodar os testes.
    // type: "sqlite" -> O tipo do banco de dados sera sqlite.
    // database: "memory" -> Sera utilizado apenas na memoria do PC e será excluido apos terminar.
    // synchronize: true -> Sempre vai pegar os arquivos mais atualizados das entidades e sincronizar com o banco de dados em memoria.
    // entities: [ entitiesPath ] -> Caminho das entidades.
    if(nodeEnv === 'test') {
        return {
            type: 'sqlite',
            database: ':memory',
            synchronize: true,
            entities: [ entitiesPath ]
        }
    }

    return {
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: true,
        migrations: [ migrationsPath ],
        entities: [ entitiesPath ]
    }
}


// AppDataSource será utilizado para conectar o banco de dados
const AppDataSource = new DataSource(dataSourceConfig())


export {
    AppDataSource
}