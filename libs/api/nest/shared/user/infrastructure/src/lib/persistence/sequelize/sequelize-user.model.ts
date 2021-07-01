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
export class SequelizeUserModel extends Model<SequelizeUserModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  public user_id: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    unique: true,
  })
  public user_email: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  public user_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  public user_password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public is_email_verified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public is_admin_user: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public is_deleted: boolean;
}
