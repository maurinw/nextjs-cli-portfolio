import DefaultFrame from "../components/DefaultFrame";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <DefaultFrame title="About">
        <ul className="list-none p-0">
          <li className="flex items-center gap-2">
            <FaLinkedin />
            <span>Link TBD</span>
          </li>
          <li className="flex items-center gap-2">
            <FaGithub />
            <span>Link TBD</span>
          </li>
        </ul>
    </DefaultFrame>
  );
}
