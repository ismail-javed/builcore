/** Demo data for BuildCore UI — replace with API responses later */

export const adminLeads = [
  { id: 1, name: "Anita Kapoor", phone: "+91 98200 11234", city: "Pune", type: "Turnkey · 3BHK", value: "₹82L", stage: "quote" as const, owner: "Rohan S.", updated: "2 hrs ago" },
  { id: 2, name: "Suresh Mehta", phone: "+91 98765 44321", city: "Nagpur", type: "Structure · 240 sqyd", value: "₹36L", stage: "new" as const, owner: "Rohan S.", updated: "Yesterday" },
  { id: 3, name: "Priya Verma", phone: "+91 98100 55678", city: "Mumbai", type: "Turnkey · Villa", value: "₹1.4Cr", stage: "draw" as const, owner: "Kiran D.", updated: "Today" },
  { id: 4, name: "Rahul Nair", phone: "+91 98920 33445", city: "Nashik", type: "Turnkey · 4BHK", value: "₹1.1Cr", stage: "agr" as const, owner: "Ravi M.", updated: "3 days ago" },
  { id: 5, name: "Deepak Joshi", phone: "+91 97654 22110", city: "Aurangabad", type: "Structure only", value: "₹28L", stage: "new" as const, owner: "Rohan S.", updated: "5 days ago" },
];

export const adminProjects = [
  { id: 1, client: "Kapoor Villa", location: "Pune", package: "Premium Plus", pm: "Kiran D.", stage: "wip" as const, progress: 85, nextDue: "12 May", budget: "₹95L" },
  { id: 2, client: "Sharma 3BHK", location: "Nagpur", package: "Structure Std.", pm: "Amit S.", stage: "wip" as const, progress: 60, nextDue: "19 May", budget: "₹42L" },
  { id: 3, client: "Verma Villa", location: "Mumbai", package: "Custom", pm: "Kiran D.", stage: "draw" as const, progress: 20, nextDue: "10 May", budget: "₹1.4Cr" },
  { id: 4, client: "Nair 4BHK", location: "Nashik", package: "Premium Std.", pm: "Ravi M.", stage: "agr" as const, progress: 10, nextDue: "15 May", budget: "₹1.1Cr" },
  { id: 5, client: "Mehta Bungalow", location: "Thane", package: "Premium Plus", pm: "Amit S.", stage: "wip" as const, progress: 40, nextDue: "22 May", budget: "₹78L" },
];

export const adminAgreements = [
  { id: 1, project: "Nair 4BHK", client: "Rahul Nair", value: "₹1.1Cr", status: "draft" as const, lawyer: "Legal team", due: "15 May" },
  { id: 2, project: "Kapoor Villa", client: "Anita Kapoor", value: "₹95L", status: "done" as const, lawyer: "Signed", due: "1 Apr" },
  { id: 3, project: "Joshi Plot", client: "Deepak Joshi", value: "₹28L", status: "review" as const, lawyer: "Pending review", due: "28 May" },
];

export const architectureQueue = [
  { id: 1, project: "Verma Villa", drawing: "Floor plan v2", architect: "Sneha R.", status: "review" as const, iteration: "2/3", due: "10 May" },
  { id: 2, project: "Sharma 3BHK", drawing: "Elevation v1", architect: "Arjun P.", status: "new" as const, iteration: "1/3", due: "14 May" },
  { id: 3, project: "Kapoor Villa", drawing: "Structural v3", architect: "Sneha R.", status: "done" as const, iteration: "3/3", due: "Done" },
];

export const siteOps = [
  { id: 1, project: "Kapoor Villa", milestone: "Foundation", supervisor: "Vikram T.", crew: 12, status: "wip" as const, progress: 85 },
  { id: 2, project: "Sharma 3BHK", milestone: "Structure", supervisor: "Mahesh K.", crew: 18, status: "wip" as const, progress: 60 },
  { id: 3, project: "Mehta Bungalow", milestone: "Finishing", supervisor: "Rakesh N.", crew: 8, status: "due" as const, progress: 40 },
];

export const adminPayments = [
  { id: 1, project: "Kapoor Villa", client: "Anita Kapoor", milestone: "Foundation", amount: "₹8L", status: "paid" as const, date: "4 May" },
  { id: 2, project: "Verma Villa", client: "Priya Verma", milestone: "Design", amount: "₹12L", status: "due" as const, date: "20 May" },
  { id: 3, project: "Sharma 3BHK", client: "Raj Sharma", milestone: "Structure", amount: "₹15L", status: "upcoming" as const, date: "1 Jun" },
  { id: 4, project: "Nair 4BHK", client: "Rahul Nair", milestone: "Booking", amount: "₹5L", status: "paid" as const, date: "12 Mar" },
];

export const packages = [
  { id: 1, name: "Structure Std.", price: "₹1,800/sqft", type: "Structure", projects: 8, popular: false },
  { id: 2, name: "Premium Std.", price: "₹2,400/sqft", type: "Turnkey", projects: 14, popular: true },
  { id: 3, name: "Premium Plus", price: "₹2,850/sqft", type: "Turnkey", projects: 6, popular: false },
  { id: 4, name: "Custom", price: "On quote", type: "Turnkey", projects: 3, popular: false },
];

export const clientDrawings = [
  { id: 1, name: "Floor plan v2", meta: "Updated 6 May · Rev 2 of 3", status: "review" as const, slug: "review" },
  { id: 2, name: "Elevation drawing v1", meta: "Uploaded 28 Apr · Rev 1 of 3", status: "done" as const, slug: "" },
  { id: 3, name: "Structural layout v1", meta: "Uploaded 30 Apr · Rev 1 of 3", status: "new" as const, slug: "" },
];

export const clientMessages = [
  { id: 1, from: "Sneha R.", role: "Architect", text: "Floor plan v2 is ready. Please review the open kitchen layout we discussed.", time: "Today 10:42 am", unread: true },
  { id: 2, from: "Rohan S.", role: "Sales", text: "Your next payment of ₹12L is due on 20 May. Please confirm preferred mode.", time: "Yesterday 3:15 pm", unread: true },
  { id: 3, from: "Kiran D.", role: "PM", text: "Agreement draft will be shared once drawings are finalised.", time: "5 May, 11:00 am", unread: false },
];

export const clientPaymentSchedule = [
  { name: "Booking amount", date: "Paid 1 Apr 2026", amount: "₹5L", status: "paid" as const },
  { name: "Design milestone", date: "Due 20 May 2026", amount: "₹12L", status: "due" as const },
  { name: "Foundation stage", date: "After agreement sign", amount: "₹28L", status: "upcoming" as const },
  { name: "Structure complete", date: "Est. Aug 2026", amount: "₹35L", status: "upcoming" as const },
  { name: "Finishing & handover", date: "Est. Dec 2026", amount: "₹40L", status: "upcoming" as const },
];

export const packageInclusions = [
  { category: "Structure", items: ["RCC frame", "Brick work", "Waterproofing", "Plinth protection"] },
  { category: "Finishing", items: ["Flooring — vitrified", "Internal paint", "Modular kitchen", "Bathroom fittings"] },
  { category: "Services", items: ["Electrical wiring", "Plumbing", "3 drawing iterations", "Dedicated PM"] },
];

export const projectMilestones = [
  { name: "Site survey", date: "15 Mar 2026", status: "done" as const },
  { name: "Booking & kickoff", date: "1 Apr 2026", status: "done" as const },
  { name: "Drawing approval", date: "10 May 2026", status: "wip" as const },
  { name: "Agreement signing", date: "25 May 2026", status: "upcoming" as const },
  { name: "Construction start", date: "Jun 2026", status: "upcoming" as const },
];
