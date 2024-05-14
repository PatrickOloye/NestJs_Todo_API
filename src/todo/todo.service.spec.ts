// import { Test, TestingModule } from '@nestjs/testing';
// import { TodoService } from './todo.service';
// import { TodoEntity } from 'src/entity/todo.entity';

// describe('TodoService', () => {
//   let service: TodoService;
//   let fakeTodoService: Partial<TodoService>;

//   beforeEach(async () => {
//     const fakeTodoService = {
//       find: () => Promise.resolve([]),
//       createTodo: (title: string, userId: number) => Promise.resolve({
//         id: 1, 
//         title, 
//         userId
//       }),
//       deleteTodo: (todoId: number) => Promise.resolve({
//         Id: 1,
//         todoId, 
     
//       }),
//       findTodo: (todoId: number) => Promise.resolve({
//         id: 1,
//         todoId, 
     
//       })
//     }
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [TodoService],
//     }).compile();

//     service = module.get<TodoService>(TodoService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
