import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  EntityRepository,
  Repository,
  UpdateDateColumn,
} from 'typeorm';

export enum LoginTypeEnum {
  NAVER = 'NAVER',
  FORTYTWO = '42',
  KAKAO = 'KAKAO',
}

export enum UserRoleEnum {
  DEVELOPER = 'DEVR',
  COMMONUSER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @Column({
    primary: true,
    type: 'enum',
    enum: LoginTypeEnum,
    nullable: false,
  })
  login_type: LoginTypeEnum;

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
    enum: UserRoleEnum,
    nullable: false,
    default: UserRoleEnum.COMMONUSER,
  })
  user_role: UserRoleEnum;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  access_token: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  image_url: string;

  @CreateDateColumn()
  create_at: string;

  @UpdateDateColumn()
  update_at: string;

  @DeleteDateColumn()
  delete_at: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
