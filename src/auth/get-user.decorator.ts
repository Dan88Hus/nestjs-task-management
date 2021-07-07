//we create custom Decorator to not use @Req() req
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// export const GetUser = createParamDecorator((data, req): User => {
//     return req.user;
// }); // before nest -v 7


export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});