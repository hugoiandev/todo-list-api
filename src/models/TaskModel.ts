export default interface ITask {
  id: number;
  title: string;
  completed?: boolean;
  auth0Id: string;
}
