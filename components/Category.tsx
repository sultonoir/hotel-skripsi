"use client";

import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Deluxe Room",
    description:
      "Nikmati kenyamanan dan kemewahan di deluxe room kami yang berukuran 40 m2. Kamar ini dilengkapi dengan pilihan kasur double atau twin yang nyaman, kulkas mini, televisi, AC, telepon, dan fasilitas lainnya. Anda juga bisa menikmati pemandangan kota yang indah dari jendela kamar. Pesan sekarang dan dapatkan diskon spesial untuk menginap di deluxe room kami!",
  },
  {
    label: "Grand Deluxe Room",
    description:
      "Grand Deluxe Room adalah pilihan kamar hotel yang ideal untuk Anda yang ingin menikmati pengalaman menginap yang nyaman dan elegan. Dengan Grand Deluxe Room, Anda bisa menikmati tempat tidur yang nyaman dengan bantal memory foam. Anda juga bisa bekerja atau bersantai di meja kerja yang dilengkapi dengan lampu meja yang dapat disesuaikan. Anda bisa menonton TV HD 40 inci dengan berbagai saluran TV. Anda bisa menyeduh kopi atau teh dengan mesin espresso yang tersedia di kamar. Anda bisa memanjakan diri Anda di kamar mandi dengan bathtub dan shower hujan. Grand Deluxe Room memberikan Anda kesempatan untuk merasakan pemandangan taman yang indah dari balkon kamar. Pesan Grand Deluxe Room sekarang juga dan nikmati fasilitas dan layanan terbaik dari hotel pilihan Anda.",
  },
  {
    label: "Executive Grand Deluxe Room",
    description:
      "Executive Grand Deluxe Room adalah pilihan kamar hotel yang ideal untuk Anda yang ingin menikmati pengalaman menginap yang nyaman dan mewah. Dengan Executive Grand Deluxe Room, Anda bisa menikmati tempat tidur yang nyaman dengan pilihan bantal yang sesuai dengan selera Anda. Anda juga bisa bekerja atau bersantai di ruang kerja yang dilengkapi dengan meja dan Wi-Fi berkecepatan tinggi. Anda bisa menonton TV LED pintar dengan berbagai saluran TV. Anda bisa memanjakan diri Anda di kamar mandi dengan shower dan bathtub besar. Executive Grand Deluxe Room memberikan Anda kesempatan untuk merasakan pemandangan kota yang indah dari jendela kamar. Pesan Executive Grand Deluxe Room sekarang juga dan nikmati fasilitas dan layanan terbaik dari hotel pilihan Anda.",
  },
  {
    label: "Connecting Room",
    description:
      "Connecting Rooms adalah pilihan kamar hotel yang ideal untuk Anda yang ingin menikmati kenyamanan dan kebersamaan bersama keluarga atau teman. Dengan Connecting Rooms, Anda bisa menghubungkan dua kamar yang bersebelahan dengan pintu di dalamnya. Anda bisa membuka atau menutup pintu sesuai kebutuhan. Connecting Rooms memberikan Anda fleksibilitas, privasi, dan kemudahan dalam berkomunikasi dan berinteraksi dengan orang-orang terdekat Anda. Nikmati fasilitas dan layanan terbaik dari hotel pilihan Anda dengan memesan Connecting Rooms sekarang juga.",
  },
  {
    label: "Familly Suite",
    description:
      "Familly Suite adalah pilihan kamar hotel yang sempurna untuk Anda yang ingin berlibur bersama keluarga besar. Dengan Familly Suite, Anda bisa menikmati dua kamar tidur yang nyaman dengan tempat tidur yang sesuai dengan kebutuhan Anda. Anda juga bisa bersantai di ruang tamu yang luas dengan fasilitas hiburan dan pemandangan indah dari balkon. Kamar mandi kamar ini menyediakan bathtub, shower, dan wastafel ganda untuk memudahkan Anda bersiap-siap. Familly Suite memberikan Anda kesempatan untuk merasakan pengalaman menginap yang berkesan bersama orang-orang tercinta. Pesan Familly Suite sekarang juga dan nikmati fasilitas dan layanan terbaik dari hotel pilihan Anda.",
  },
  {
    label: "President Suite",
    description:
      "President Suite adalah pilihan kamar hotel yang sempurna untuk Anda yang ingin merasakan pengalaman menginap yang tak terlupakan. Dengan President Suite, Anda bisa menikmati kamar tidur utama yang nyaman dengan tempat tidur ukuran king dan TV LCD. Anda juga bisa bersantai di ruang tamu yang elegan dengan home theatre dan treadmill. Anda bisa menyelenggarakan pesta makan malam dengan menu yang disiapkan oleh tim kuliner hotel di ruang makan yang mewah. Anda bisa memanjakan diri Anda di kamar mandi marmer dengan bathtub, shower, dan wastafel ganda. President Suite memberikan Anda kesempatan untuk merasakan kemewahan dan kenyamanan tingkat tinggi bersama orang-orang tercinta. Pesan President Suite sekarang juga dan nikmati fasilitas dan layanan terbaik dari hotel pilihan Anda.",
  },
];

const Category = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainpage = pathname === "/";
  return <div>Category</div>;
};

export default Category;
