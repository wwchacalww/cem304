import { Agenda } from "../entity/agenda";

export interface AgendasRepositoryInterface {
  add(agenda: Agenda): Promise<void>;
  list(ano: number): Promise<Agenda[]>;
}
