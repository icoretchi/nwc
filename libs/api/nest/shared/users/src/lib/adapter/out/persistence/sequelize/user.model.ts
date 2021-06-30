import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users',
  underscored: true,
  indexes: [{ unique: true, fields: ['email'] }],
})
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  public id: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    unique: true,
  })
  public email: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  public username: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  public password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public isEmailVerified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public isAdminUser: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public isDeleted: boolean;
}
