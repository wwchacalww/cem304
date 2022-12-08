import { Aula } from "../entity/aula";

export type InputListRF = {
  professor_id: string;
  period: {
    in: Date;
    out: Date;
  };
};
export interface AulasRepositoryInterface {
  add(aula: Aula): Promise<void>;
  listRF({ professor_id, period }: InputListRF): Promise<any[]>;
}
