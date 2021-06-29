import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  EntityRepository,
  Repository,
  UpdateDateColumn,
} from 'typeorm';

export enum LoginType {
  NAVER = 'NAVER',
  FORTYTWO = '42',
  KAKAO = 'KAKAO',
}

export enum UserRole {
  DEVELOPER = 'DEVR',
  COMMONUSER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @Column({
    type: 'varchar',
    primary: true,
    length: 30,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'enum',
    enum: LoginType,
    nullable: false,
  })
  login_type: LoginType;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
  })
  user_role: UserRole;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  access_token: string;

  @CreateDateColumn()
  create_at: string;

  @UpdateDateColumn()
  update_at: string;

  @DeleteDateColumn()
  delete_at: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
