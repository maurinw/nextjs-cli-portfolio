import DefaultFrame from "../components/DefaultFrame";
import { FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <DefaultFrame title="Contact">
        <ul className="list-none p-0">
          <li className="flex items-center gap-2">
            <FaEnvelope />
            <a href="mailto:dev.maurin@gmail.com" className="hover:underline">
              dev.maurin@gmail.com
            </a>
          </li>
        </ul>
    </DefaultFrame>
  );
}