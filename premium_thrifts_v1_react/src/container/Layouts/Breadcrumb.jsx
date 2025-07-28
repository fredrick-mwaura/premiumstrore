import React from "react";
import { useLocation } from "react-router-dom";
import {Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb"; 

export default function DynamicBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);


  const pathNames = pathnames.slice(0, pathnames.length - 1);

  // console.log(`path1: ${pathnames}, pathnew: ${pathNames}`);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-2xl md:font-900">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathNames.map((name, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;

          return (
            <React.Fragment key={name}>
              {/* Separator */}
              <BreadcrumbSeparator />

              <BreadcrumbItem className="text-2xl font-900">
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={routeTo}>{name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
