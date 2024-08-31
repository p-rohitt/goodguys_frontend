"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Textarea } from "./ui/textarea";

//fetch it from api

export function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch("http://127.0.0.1:8000/tickets/");
      if (!response.ok) {
        console.log("Cannot fetch tickets");
        return;
      }

      const data = await response.json();
      console.log(data);
      setTickets(data);
    };

    fetchTickets();
  }, []);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsTicketDetailOpen(true);
  };
  const handleCloseTicketDetail = () => {
    setIsTicketDetailOpen(false);
    setSelectedTicket(null);
  };

  const handleDeleteTicket = async (ticket_id) => {
    setIsTicketDetailOpen(false);
    const string_id = ticket_id.toString();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tickets/${string_id}/delete/`,
        { method: "DELETE" }
      );

      if (response.ok) {
        const index = tickets.findIndex(
          (ticket) => ticket.ticket_id === ticket_id
        );
        if (index !== -1) {
          tickets.splice(index, 1); // Remove the ticket at the found index
        }
      }
      setIsTicketDetailOpen(false);
    } catch (e) {
      console.log("Error deleting ticket, ", e);
      return;
    }
  };

  const handleAddComment = async (ticketId, comment) => {
    console.log("body ", { ticket_id: ticketId, comment: comment });

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/tickets/addComment/",
        {
          method: "POST",
          body: JSON.stringify({
            ticket_id: ticketId,
            comment: comment,
          }),
        }
      );

      if (response.status >= 400) {
        console.log("error adding comment ");
        return;
      }
      selectedTicket.comments.push(userComment);
      setIsOpen(false);
      setUserComment("");
    } catch (e) {
      console.log("Error adding comment ", e);
      return;
    }

    return;
  };

  const i = 0;
  return (
    <div className="flex flex-1 flex-col mt-0 sm:gap-4 sm:py-4 sm:pl-14">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <BugIcon className="w-6 h-6" />
          <span className="text-xl font-bold">Tickets</span>
        </Link>
      </header>
      <div className="p-6 flex-1 overflow-auto">
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tickets..."
              className="pl-10 w-full"
            />
          </div>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket, index) => (
                <TableRow
                  key={ticket.id}
                  onClick={() => handleTicketClick(ticket)}
                >
                  <TableCell>
                    <Link href="#" className="font-medium" prefetch={false}>
                      {ticket.ticket_id}
                    </Link>
                  </TableCell>
                  <TableCell>{ticket.endpoint}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.risk}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Assign</DropdownMenuItem>
                        <DropdownMenuItem>Comment</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Button variant={"ghost"}>
                            <div
                              onClick={() =>
                                handleDeleteTicket(ticket.ticket_id)
                              }
                            >
                              Delete
                            </div>
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex justify-end">
          <Pagination />
        </div>
      </div>
      {isTicketDetailOpen && (
        <Dialog
          open={isTicketDetailOpen}
          onOpenChange={handleCloseTicketDetail}
        >
          <DialogContent className="w-[90vw] max-w-[600px] p-6 overflow-scroll h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="font-bold text-lg">{selectedTicket.id}</div>
                <div className="text-muted-foreground">
                  {selectedTicket.title}
                </div>
              </div>
              {/* <Button variant="ghost" size="icon" onClick={handleCloseTicketDetail}>
                <XIcon className="w-5 h-5" />
              </Button> */}
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="text-sm font-medium">Endpoint</div>
                <div className="text-muted-foreground">
                  {selectedTicket.endpoint}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium">Status</div>
                <div className="text-muted-foreground">
                  {selectedTicket.status}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium">Assignee</div>
                <div className="text-muted-foreground">
                  {selectedTicket.assignee
                    ? selectedTicket.assignee
                    : "Not Assigned"}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium">Priority</div>
                <div className="text-muted-foreground">
                  {selectedTicket.risk}
                </div>
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-medium">Description</div>
                <div className="text-muted-foreground">
                  {selectedTicket.description}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Comments</div>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setIsOpen(true)}>
                        Add Comment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] w-full">
                      <DialogHeader>
                        <DialogTitle>Add Comment</DialogTitle>
                      </DialogHeader>
                      <div>
                        <Textarea
                          placeholder="Enter your comment here"
                          className="w-full min-h-[150px]"
                          value={userComment}
                          onChange={(e) => setUserComment(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsOpen(false)}
                          className="mr-2"
                        >
                          Cancel
                        </Button>
                        <Button>
                          <div
                            onClick={() =>
                              handleAddComment(
                                selectedTicket.ticket_id,
                                userComment
                              )
                            }
                          >
                            Submit
                          </div>
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid gap-2">
                  {selectedTicket.comments.length > 0 ? (
                    <>
                      {selectedTicket.comments.map((comment, index) => (
                        <div key={index} className="bg-muted rounded-lg p-3">
                          {/* <div className="font-medium">{comment.author}</div> */}
                          <div className="text-muted-foreground">{comment}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    "No comments"
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex gap-2">
                  <Button variant={"secondary"} size={"sm"} className="flex-1">
                    <div onClick={()=>setIsTicketDetailOpen(false)}>

                    {"Close"}
                    </div>
                  </Button>
                  <Button
                    variant={""}
                    size={"sm"}
                    className="flex-1 bg-green-500"
                  >
                    {"Resolve"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function BugIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
