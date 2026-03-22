//
//  useUserStore.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { create } from "zustand";
import { UserVO } from "../../model/valueObject/UserVO";

function cloneUserVO(user: UserVO): UserVO {
  const copy = new UserVO(
    user.id,
    user.username,
    user.first,
    user.last,
    user.email,
    user.password,
    user.department,
    [...user.roles],
  );
  copy.confirm = user.confirm;
  return copy;
}

type UserState = {
  users: UserVO[];
  setUsers: (users: UserVO[]) => void;
  upsertUser: (user: UserVO) => void;
};

const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users: users.map(cloneUserVO) }),
  upsertUser: (user) =>
    set((state) => {
      const resolved =
        user.id === 0
          ? (() => {
              const nextId = state.users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
              const created = new UserVO(
                nextId,
                user.username,
                user.first,
                user.last,
                user.email,
                user.password,
                user.department,
                [...user.roles],
              );
              created.confirm = user.confirm;
              return created;
            })()
          : cloneUserVO(user);
      const index = state.users.findIndex((u) => u.id === resolved.id);
      if (index >= 0) {
        const next = [...state.users];
        next[index] = resolved;
        return { users: next };
      }
      return { users: [...state.users, resolved] };
    }),
}));

export default useUserStore;
