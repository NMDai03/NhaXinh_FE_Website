"use client";
import React, { useEffect, useState, useCallback } from "react";
import Talk from "talkjs";
import { Session, Inbox } from "@talkjs/react";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { ConversationBuilder } from "talkjs/all";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const AdminChat: React.FC = () => {
  const [admin, setAdmin] = useState<User | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [talkReady, setTalkReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const currentUser = await nhaxinhService.api.userCurrentUserList();
      const allUsers = await nhaxinhService.api.userGetAllUserList();

      const adminUser = {
        userId: currentUser.data.userId,
        firstName: currentUser.data.firstName || "Admin",
        lastName: currentUser.data.lastName || "",
        email: currentUser.data.email,
        role: currentUser.data.role,
      };

      setAdmin(adminUser);

      const customers = allUsers.data.filter(
        (u: User) => u.role === "customer"
      );
      if (customers.length > 0) {
        setSelectedCustomer(customers[0]);
      }

      setTalkReady(true);
    };

    init();
  }, []);

  const syncAdmin = useCallback(() => {
    if (!admin) return null;

    return new Talk.User({
      id: admin.userId,
      name: admin.firstName + " " + admin.lastName,
      email: admin.email,
      photoUrl: "admin_photo_url",
      role: "admin",
    });
  }, [admin]);

  const syncConversation = useCallback<
    (session: Talk.Session) => ConversationBuilder
  >(
    (session: Talk.Session) => {
      const customer = new Talk.User({
        id: selectedCustomer?.userId || "",
        name: selectedCustomer?.firstName + " " + selectedCustomer?.lastName,
        email: selectedCustomer?.email,
        photoUrl: "customer_photo_url",
        role: "customer",
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(session.me, customer)
      );

      conversation.setParticipant(session.me);
      conversation.setParticipant(customer);

      return conversation;
    },
    [selectedCustomer]
  );

  if (!talkReady || !admin || !selectedCustomer) return <div>Loading...</div>;

  return (
    <div className="h-full w-full py-5">
      <Session appId="teExUqPD" syncUser={syncAdmin as () => Talk.User}>
        <Inbox
          style={{ flex: 1, height: "100%" }}
          syncConversation={syncConversation}
        />
      </Session>
    </div>
  );
};

export default AdminChat;
