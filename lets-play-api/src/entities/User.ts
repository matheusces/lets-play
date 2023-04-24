import { v4 as uuidv4 } from "uuid";

export interface UserProps {
  nickname: string;
  email: string;
  password: string;
}

export class User {
  private id?: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this.props = props;

    if (!id) {
      this.id = uuidv4();
    }
  }

  get _id() {
    return this.id;
  }

  get nickname() {
    return this.props.nickname;
  }

  set nickname(nickname: string) {
    this.props.nickname = nickname;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }
}
